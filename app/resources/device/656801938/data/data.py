import json
data = json.load(open("profile_offline_std.json"))
data2 = json.dumps(data)

# print(data)
# print(eval('u"%s"' % data))
print(json.loads('"%s"' % data))
print(eval('u"%s"' % data2))
