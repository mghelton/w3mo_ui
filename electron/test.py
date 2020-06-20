from sys import argv
from w3mo.w3mo import discover
import json

if __name__ == '__main__':
    try:
        if(argv[1] == 'get'):
            x = discover()
            for key in x:
                x[key]['state'] = x[key]['obj'].state
                del(x[key]['obj'])
            print(json.dumps(x))
    except Exception as e:
        print(type(e).__name__,e.args)