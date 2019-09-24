#Section: Monolith to Microservices at Scale
## Project: Refactor Udagram app into Microservices and Deploy

### Links
**Docker Hub**: https://hub.docker.com/u/aam629

### Secrets and ConfigMaps to set
In order to run the application on Kuberenetes you need to edit the following files with your specific settings:
	course-03/udacity-c3-deployment/k8s/aws-secret.yaml
	course-03/udacity-c3-deployment/k8s/env-configmap.yaml
	course-03/udacity-c3-deployment/k8s/env-secret.yaml

### To setup the application
1) Install Kubernetes (my preferred method has been [kops](https://github.com/kubernetes/kops/blob/master/docs/aws.md) on AWS).  I also added a helper setup script in k8setup.sh.
2) Deploy Kubernetes (I created a script to help with called k8_setup_deplooy.sh)
3) Expose application on localhost (by default)

### To expose applicaton on localhost
Expose the frontend service to port 8100 using:
`kubectl port-forward service/frontend 8100:8100`

Expose the backend service to port 8080 using:
`kubectl port-forward service/reverseproxy 8080:8080`

Then you can view it on your web browser on:
http://localhost:8100