sudo apt-get update
sudo apt install python3
sudo apt install python3-pip
sudo apt install nginx
pip3 install -r ../requirements.txt
sudo cp w3mo /etc/nginx/sites-enabled
sudo rm -r /etc/nginx/sites-enabled/default
sudo cp w3mo.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable w3mo
sudo systemctl restart nginx
sudo systemctl start w3mo