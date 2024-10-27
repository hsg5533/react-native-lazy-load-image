# react-native-lazy-load-image

A react native plugin to lazy load image with loading indicator and show default image if something goes wrong with image path and resolve image issues and much more 

## Installation

using either Yarn:

```
yarn add react-native-lazy-load-image
```

or npm:

```
npm install react-native-lazy-load-image
```

## Usage

```
import { LazyLoadImage } from 'react-native-lazy-load-image';

<LazyLoadImage source={{uri: 'https://via.placeholder.com/640x360'}} />
```

## Demo 

<div style="text-align:center;">
  <a href="https://user-images.githubusercontent.com/32444692/217605648-487e7f48-8203-48cb-a8c0-6c3f6c4a258b.gif"><img src="https://user-images.githubusercontent.com/32444692/217605648-487e7f48-8203-48cb-a8c0-6c3f6c4a258b.gif" alt="React Native Lazy Load Image demo" style="width:300px;"/></a>
</div>

## Features

-   [x] Show loading before image being ready to load.
-   [x] Show default image if there is any error in image path.
-   [x] Auto width/height applied if no width/height in given. 
-   [x] Image all props supported.
-   [x] ImageBackground supported.
-   [x] Expo supported.

## Props

It accepts all the [Image](https://reactnative.dev/docs/images) props and also some extra props too.

## Properties

### `color?: string | hex`

Color of loading indicator

---

### `default.uri?: string`

Remote url to load the default image if something goes wrong with source image.

---

### `default?: string`

local path for default image if something goes wrong with source image.

---

### `loading?: boolean` 

Need loading indicator while image getting ready to load default (true)

---

### `autoWidthHightApplied?: boolean` 

Need auto width height of image default (true)

---

### `imageStyle?: object` 

Need extra image styling

---

### `background?: boolean` 

If you want to use ImageBackground then set background to true, default if false

---
