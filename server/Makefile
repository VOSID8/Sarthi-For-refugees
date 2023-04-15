create:
	sudo docker-compose up --build -d

destroy:
	sudo docker-compose down

recreateall:
	make destroy
	make create

redeploy:
	make destroy
	git pull
	make create
