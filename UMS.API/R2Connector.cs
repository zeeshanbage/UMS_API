
using Amazon.S3;
using Amazon.S3.Model;

public class R2Connector
{
    private static AmazonS3Client s3Client;

    static R2Connector()
    {
        var ACCOUNT_ID = "2c2f1e28598b0cb4c25019ded5a057ae";
        s3Client = new AmazonS3Client(
        awsAccessKeyId: "7b7e0f9e7b4ed2418eb229e68a4bc0c0",
        awsSecretAccessKey: "0258ca740851edade16696a34532cdbcf8f343f330afd6b0d2287c79983303e6",
        new AmazonS3Config
        {
            ServiceURL= $"https://{ACCOUNT_ID}.r2.cloudflarestorage.com"
        }
        );
    }
    public static string GetSignedUrl(string pathToFile)
    {

        var request = new GetPreSignedUrlRequest
        {
            BucketName = "multi-services-document-test",
            Key = $"uploads/{pathToFile}",
            Expires = DateTime.UtcNow.AddMinutes(30), // URL expiration time in minutes
            Verb = HttpVerb.PUT
        };

        var url = s3Client.GetPreSignedURL(request);
        return url;
    }
}