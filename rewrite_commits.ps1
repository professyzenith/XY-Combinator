$ErrorActionPreference = "Stop"

$commits = @(
    @("5c203f3", "chore(core): initialize project from Create Next App"),
    @("7ad13e6", "feat(core): implement initial video conferencing platform"),
    @("52c1876", "feat(core): implement mobile-optimized animations"),
    @("bec4490", "feat(core): add Three.js WebGL background and CSS effects"),
    @("2bdd234", "chore(config): disable development indicators"),
    @("4d759e1", "fix(core): force hide next.js development portal"),
    @("d37b600", "feat(intro): add unsplash images to background"),
    @("c2eb4bf", "style(intro): replace photos with aurora mesh gradient"),
    @("d991f53", "style(intro): update animation to sleek dark theme"),
    @("04dd233", "style(auth): update pages to premium split-screen layout"),
    @("85ca91c", "style(auth): revert split-screen and add 3D background"),
    @("b5377f2", "feat(three): enhance scene vibrancy and color palette"),
    @("229379b", "style(three): update background to dark metallic aesthetic"),
    @("4ba9ac9", "fix(three): resolve ReferenceError during hot-reload cleanup"),
    @("34bc9b9", "fix(three): add missing group declaration in scene initialization"),
    @("8a1a72e", "style(hero): remove 3D background to restore clean aesthetic"),
    @("f649ecc", "style(auth): remove 3D background from authentication pages"),
    @("e8a0109", "feat(auth): redesign register page with glassmorphism and aurora background")
)

Write-Host "Starting rewrite..."
git checkout $($commits[0][0])
git commit --amend -m $($commits[0][1])

for ($i = 1; $i -lt $commits.Length; $i++) {
    $hash = $commits[$i][0]
    $msg = $commits[$i][1]
    Write-Host "Cherry-picking $hash -> $msg"
    git cherry-pick $hash
    git commit --amend -m $msg
}

Write-Host "Updating master branch..."
git branch -f master HEAD
git checkout master
git push --force origin master
Write-Host "Done!"
