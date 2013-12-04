import sys
import os
import subprocess

try:
    __file__
except NameError:
    __file__ = os.path.join(os.getcwd(), 'githubInterface.py')
baseDir = os.path.dirname(__file__)

sys.path.insert(0, os.path.join(baseDir, 'requests'))
sys.path.insert(0, os.path.join(baseDir, 'uritemplate'))
sys.path.insert(0, os.path.join(baseDir, 'github3.py'))
sys.path.insert(0, os.path.join(baseDir, 'python-github3'))



from pygithub3 import *

username = 'openpullrequests'
password = '327725f6457554cd90498613e1c265b98963146a'

gh = Github(login=username, password=password)

# http://developer.github.com/v3/pulls/#example

gh.pull_requests

CalledProcessError = subprocess.CalledProcessError

def check_output(*commands, **kw):
    commands = list(commands)
    p = subprocess.Popen(commands, stderr = subprocess.PIPE,
                         stdout = subprocess.PIPE, stdin = subprocess.PIPE)
    out, err = p.communicate(**kw)
    ret = p.wait()
    if ret:
        print out
        print err
        raise subprocess.CalledProcessError(ret, commands, out + err)
    return out


pullrequestrepo = 'openpullrequests'
pullrequestrepourl = 'git@github.com:openpullrequests/spiele-mit-kindern.git'
puttykeyfile = r'C:\Users\wollknaeul\Documents\zertifikate\github_key.ppk'
ourbranch = 'gh-pages'

def updateGitBranch():
    output = check_output('git', 'remote')
    if pullrequestrepo in output:
        check_output('git', 'remote', 'remove', pullrequestrepo)
    check_output('git', 'remote', 'add', pullrequestrepo, pullrequestrepourl)
    check_output('git', 'config', '--add', 'remote.'+pullrequestrepo+'.puttykeyfile', puttykeyfile)
    check_output('git', 'checkout', ourbranch)
    check_output('git', 'pull', 'origin')

last_commit = lambda: check_output(*'git rev-list --parents HEAD'.split()).split()[0]
    
def create_pull_request(files_to_contents, title, body):
    '''create a pull request with the code => commit '''
    check_output('git', 'checkout', ourbranch)
    check_output('git', 'stash')
    base_commit = last_commit()
    print 'base commit', base_commit
    try:
        for file in files_to_contents:
            open(file, 'wb').write(files_to_contents[file])
            check_output('git', 'add', file)
        output = check_output('git', 'commit', '-m', title)
        commit = last_commit()
        check_output('git', 'push', pullrequestrepo, ourbranch)
        pullrequest = gh.pull_requests.create({
              "title": title,
              "body": body,
              "head": commit,
              "base": ourbranch
            }, 'niccokunzmann', 'spiele-mit-kindern')
    finally:
        check_output('git', 'reset', '--hard', base_commit)
        try:check_output('git', 'stash', 'pop')
        except CalledProcessError: pass
    return commit

def create_pull_request_example():
    create_pull_request({'test': 'testtext'}, 'test von nicco', 'this is only a test')

