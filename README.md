# pkg-x86
Package your Node.js project into an executable, *but the target is an age-old legacy 32bit Windows PC!*

> :innocent: To make this exe console-less, you can try [my Gist in GoLang!](https://gist.github.com/amexn-me/59928f2c2900b12ec2f1f76ce39e2cb2)

## Use Case

- You want to make executables for your app, which need to be used on a x86/32bit Windows System. But now that the **pkg** has [altogether stopped](https://github.com/vercel/pkg/issues/1634#issuecomment-1141919208) its support for x86, you are on a no-mans land!

## Solution

- Since there are corporations who use age old softwares that are built for legacy windows versions, solution providers like us will have to take the bullet and make workarounds from our end.
- So here's a solution to do the same, make an executable for your node app, considering all your features are supported in Node 14 or below! If you want Node 15 or above, then am sorry, you are own your own. [See the discussion for a better understanding](https://github.com/vercel/pkg-fetch/pull/173)

## Usage

```sh
npm install -g pkg-x86
```

How to use in terminal:
```console
pkg-x86 [options] <input>

  Options:

    -i        index or entry file of your node app [mandatory] 
              (Show dist/index.js in case of typescript projects)
    -o        ouputfile.exe name if you want to specify [optional]
              (output.exe will be the default)


  Examples:

  – Makes executables for Windows 32bit
    $ pkg-x86 index.js
```
---

Maintained by Flick.