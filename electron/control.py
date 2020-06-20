import sys
import time
from w3mo.w3mo import w3mo

if __name__ == '__main__':
    x = w3mo(ip=sys.argv[1])
    x.set_state(int(sys.argv[2]))
    print(x.state)
    '''
    while True:
        state = int(input("Enter State: "))
        x.set_state(state)
        print(x.state)
    '''