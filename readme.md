curl -XPOST -H 'Content-Type: application/json' -d '{"text": "今天中午吃啥"}' 'localhost:3001/api/messages'
curl -XPOST -H 'Content-Type: application/json' -d '{"conversationId":"7400d77f-4aa4-4c08-8cb1-5ec8cf2576ea","messageId":"cmpl-6l9jgHpPtBbslLDZxDO9zzVSUAszl", "text": "还有没有别的"}' 'localhost:3001/api/messages'
curl -XPOST -H 'Content-Type: application/json' -d '{"conversationId":"7400d77f-4aa4-4c08-8cb1-5ec8cf2576ea","messageId":"cmpl-6l9jgHpPtBbslLDZxDO9zzVSUAszl", "text": "我只想吃怎么办"}' 'localhost:3001/api/messages'
curl -XPOST -H 'Content-Type: application/json' -d '{"conversationId":"7400d77f-4aa4-4c08-8cb1-5ec8cf2576ea","messageId":"cmpl-6l9jgHpPtBbslLDZxDO9zzVSUAszl", "text": "中国北京市朝阳区国贸附近有什么好吃的"}' 'localhost:3001/api/messages'