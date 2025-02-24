# CS 260 Notes

TO DEPLOY SIMON PASTE THIS OBS EDIT
./deployFiles.sh -k C:/Users/rhysm/byu/cs260/keys/Blackeyeball1.pem -h quickbid.click -s simon



git commit -am "put comments here explaning what purpose is"
git push   pushes to development

git pull  pulls from main and updates what I am working on

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 3.148.3.158
to ssh into my unbutu thing i need to 
ssh -i ~/byu/cs260/keys/nottheactualnameyaknow.pem ubuntu@44.207.3.229

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

Added HTML to all the pages and made it so everything is interactable and functions correctly.


## CSS
took a while and I learned a ton about attributes and flex.

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

Make sure you add routing to everything that has a link and if you want an image you need to use {} brackets

When you clone your source code from GitHub to a new location, the first thing you should do is run npm install in the project directory. This will cause NPM to download all of the previously installed packages and recreate the node_modules directory.
Create your project directory
Initialize it for use with NPM by running npm init -y
Make sure .gitignore file contains node_modules
Install any desired packages with npm install <package name here>
Add require('<package name here>') to your application's JavaScript
Use the code the package provides in your JavaScript
Run your code with node index.js

## React Part 2: Reactivity

use console.log() to find values by printing them in the console when you want to see what a value is



This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
