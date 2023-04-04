package pkg

import (
	"context"
	"encoding/base64"
	"fmt"
	"io"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"storj.io/uplink"
	"storj.io/uplink/edge"
)

type JwtClaim struct {
	UserID uint64
	jwt.RegisteredClaims
}

func grantAccess(bucket, prefix string) (*uplink.Access, error) {
	a, err := uplink.ParseAccess(os.Getenv("STORJ_ACCESS_GRANT"))
	if err != nil {
		return a, err
	}

	return a.Share(uplink.Permission{
		AllowDownload: true,
		AllowList:     true,
		NotAfter:      time.Now().Add(time.Second * 30),
	}, uplink.SharePrefix{
		Bucket: bucket,
		Prefix: prefix,
	})
}

func registerAccess(ctx context.Context, access *uplink.Access) (*edge.Credentials, error) {
	config := edge.Config{
		AuthServiceAddress: os.Getenv("STORJ_AUTH_SERVICE"),
	}

	return config.RegisterAccess(ctx, access, &edge.RegisterAccessOptions{
		Public: true,
	})
}

func SetupBucket(ctx context.Context, bucket string) (*uplink.Project, error) {
	a, err := grantAccess(bucket, "")
	if err != nil {
		return nil, err
	}

	p, err := uplink.OpenProject(ctx, a)
	if err != nil {
		return nil, err
	}

	_, err = p.EnsureBucket(ctx, bucket)
	if err != nil {
		return nil, err
	}

	return p, nil
}

func DownloadObject(ctx context.Context, bucket string, id uint64) (string, error) {
	p, err := SetupBucket(ctx, bucket)
	if err != nil {
		return "", err
	}
	defer p.Close()

	fileName := fmt.Sprint(id, ".jpg")
	d, err := p.DownloadObject(ctx, bucket, fileName, nil)
	if err != nil {
		return "", err
	}
	defer d.Close()

	dBytes, err := io.ReadAll(d)
	if err != nil {
		return "", err
	}

	base64Encoding := "data:image/jpg;base64," + base64.StdEncoding.EncodeToString(dBytes)

	return base64Encoding, nil
}

func DownloadMultipleObjects(ctx context.Context, bucket string, id uint64, filesCount uint8) ([]string, error) {
	p, err := SetupBucket(ctx, bucket)
	if err != nil {
		return []string{}, err
	}
	defer p.Close()

	var images []string
	for i := uint8(1); i <= filesCount; i++ {
		fileName := fmt.Sprint(id, "_", i, ".jpg")
		d, err := p.DownloadObject(ctx, bucket, fileName, nil)
		if err != nil {
			return []string{}, err
		}
		defer d.Close()

		dBytes, err := io.ReadAll(d)
		if err != nil {
			return []string{}, err
		}

		base64Encoding := "data:image/jpg;base64," + base64.StdEncoding.EncodeToString(dBytes)
		images = append(images, base64Encoding)
	}

	return images, nil
}

func GetObjectSharedLink(ctx context.Context, id uint64, bucket string) (string, error) {
	a, err := grantAccess(bucket, "")
	if err != nil {
		return "", err
	}

	c, err := registerAccess(ctx, a)
	if err != nil {
		return "", err
	}

	return edge.JoinShareURL(os.Getenv("STORJ_BASE_URL_DATA"), c.AccessKeyID, bucket, fmt.Sprint(id, ".webp"), &edge.ShareURLOptions{
		Raw: true,
	})
}
