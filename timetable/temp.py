'''
Date: 2021-03-06 16:44:59
LastEditors: FFRfree
LastEditTime: 2021-03-06 16:49:09
FilePath: \timetable\temp.py
Description: 
'''
import os
path = os.getcwd()+'\\'
for i in range(16):
    with open(path+f'w{i}.html','w') as f:
        pass
    