#Initialization

1'To initialize git on a project
~command "git init"

2.To check the branch that is currently on why repo
~command "git branch"

3. Check if the banch name on your repo === git hub repo
  -if not rename your branch name to have the same name as the github repo name
    ~command "git branch -m [initial branch] [new branch]"

4. Add the remote github repo
~command "git remote add [github http repo]"

5. Verify the current repo
~command "git remote -v"

6.Pull or Push the latest updates
~ Pull:command "git pull origin [branch]"
~ Push:command "git push origin [branch]"
      
7.Separation of Features/Code -Creating branches
   - Create a new branch and be located to that branch
    ~command "git checkout -b [new branch]"

   - To switch between branches
    ~command "git checkout [branch]"

   - To delete branches
   ~command "git branch -d [branch]"

   - Commit your code to the new branch
   ~command "git push origin [branch]"

8.To connect or switch to a specific branch
  - ~command "git fetch origin"
  if stashed required then:
  - ~command "git stash"
    
  if stashed required with untracked then:
  - ~command "git stash --include-untracked"
    
  - ~command "git checkout [branch]"
     
