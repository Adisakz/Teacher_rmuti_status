#!/bin/bash

docker run -d --name api-status --restart unless-stopped -p 3000:3000 api-status
