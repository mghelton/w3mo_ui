import sys
import time
from w3mo.w3mo import w3mo

if __name__ == '__main__':
    x = w3mo(ip=sys.argv[1])
    x.set_state(int(sys.argv[2]))
    if(not isinstance(x.state,int)):
        print(x.state.replace("\n",""))
    else:
        print(x.state)