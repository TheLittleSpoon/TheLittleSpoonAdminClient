apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: spoon-admin
  name: spoon-admin
  namespace: spoon
spec:
  selector:
    matchLabels:
      app: spoon-admin
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: spoon-admin
    spec:
      containers:
      - image: gcr.io/GOOGLE_CLOUD_PROJECT/spoon-admin:COMMIT_SHA
        name: spoon-admin
        ports:
        - containerPort: 80
          protocol: TCP
        resources:
          requests:
              memory: "50Mi"
              cpu: "50m"
          limits:
              memory: "250Mi"
              cpu: "250m"