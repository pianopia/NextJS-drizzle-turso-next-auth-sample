## Token create
```bash
openssl rand -base64 32
```

## Deploy
```bash
docker buildx build -t gcr.io/<project-id>/<project-name>:latest --platform linux/amd64 .

docker push gcr.io/<project-id>/<project-name>

gcloud run deploy <project-name> --image gcr.io/<project-id>/<project-name>:latest --platform managed --set-env-vars NODE_ENV=production --region=asia-east1
```

## No Left Space
```bash
docker system df

docker system prune -a

docker system prune --volumes
```
