
#!/bin/bash

echo ${nextRelease.version} > RELEASED

echo "Sending notification to slack workflow"

CONTENT="{\"version\": \"${RELEASED_VERSION}\", \"link\": \"https://github.com/aws/aws-northstar/releases/tag/v${RELEASED_VERSION}\"}"
curl -X POST -H 'Content-type: application/json' --data "${CONTENT}" ${SLACK_WORKFLOW_WEBHOOK}
