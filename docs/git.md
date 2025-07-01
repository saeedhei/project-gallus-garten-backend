# You have these commits:
A---B---C  (origin/main)
        \
         D---E (your local main)
# Running git pull origin main --rebase would result in:
A---B---C---D'---E' (your local main)

git pull origin main --rebase
git push origin main

