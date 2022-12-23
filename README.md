<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.catchonlabs.xyz/">
    <img src="images/logo.png" alt="Logo" width="auto" height="80">
  </a>

  <h3 align="center">Catchon WEB3 CDN</h3>

  <p align="center">
    An awesome no code solution for web3 development!
    <br />
    <a href="https://github.com/nftblackmagic/web3cdn"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/nftblackmagic/web3cdn">View Demo</a>
    ·
    <a href="https://github.com/nftblackmagic/web3cdn/issues">Report Bug</a>
    ·
    <a href="https://github.com/nftblackmagic/web3cdn/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#integration">Intergration</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

"What is the easiest way to add web3 capabilities, such as connecting a wallet and interacting with contracts, to my website?"

Catchon CDN is a web3 tool that enables low-code development for frontend engineers, smart contract engineers, and designers. It simplifies the process of interacting with blockchain technologies, allowing users to easily connect with the blockchain without needing to understand the detailed implementation of wallet and contract interactions. With a quick setup, Catchon CDN enables users to easily communicate with the blockchain.

Catchon CDN is a useful tool for:

* Smart contract developers who don't want to build a website from scratch
* UI-based web development tool users, such as those using Webflow, WIX, or WordPress, who want to add web3 functionality to their websites
* Those who want to easily call a smart contract function from their website without having to deal with complicated web3 settings.


<!-- Use the `BLANK_README.md` to get started. -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Live example

* [![React][React.js]][React-url]
* [![Webflow][Webflow.js]][Webflow-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

#### Get your website ready.

Your website can be developed using any of the following methods:
1. Coding (e.g. static HTML, React) PS: we only support React 17, react 18 will be supported in later version
2. No-code visual website builder (e.g. Webflow, Wix, SquareSpace, WordPress)


#### Get the contract ready
1. Smart Contract address (get the implemetation address if it's a proxy smart contract)
2. Smart Contract abi
3. Chain ID of the smart contract

### Intergration

Copy and paste the following script into your website html

```
<script> CONTRACT_ADDRESS="<replace the contract address you want to use>"
LOGIC_ADDRESS="<replace the contract implemetation address if it's a proxy. Unless it's as same as CONTRACT_ADDRESS>"
CHAINID=<put the chainID that dapp wants to use>
ABI=<Put the contract abi here. It might be from etherscan>
</script> 
<script src="https://catchoncdn.vercel.app/main.js" type="text/javascript"></script>
<link href="https://catchoncdn.vercel.app/main.css" rel="stylesheet">
```

For example, the website wants to interact with smart contract 0x13BD972B0bfaefC9538a43c1FDA11D71C720cD47 in mainnet. It's not a proxy contract. And it's on etherum goerli testnet.

PS: In this example, we get ABI from an API call. But not all abi can be found from API call. Add ABI=[... put your own abi here] to make sure script work
```
<script> CONTRACT_ADDRESS="0xCA127e07Ce57c78eF0C739F268A437e76c66e0F1"
LOGIC_ADDRESS="0xCA127e07Ce57c78eF0C739F268A437e76c66e0F1"
CHAINID=5
</script> 
<script src="https://catchoncdn.vercel.app/main.js" type="text/javascript"></script>
<link href="https://catchoncdn.vercel.app/main.css" rel="stylesheet">
```

After inserting the script into html, the configuration is done. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Catchon CDN is using customized attribution to associate CSS elements (such as divs and buttons) with corresponding function calls in a smart contract.
<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

### How to add connect wallet button
Add a button with customized attribution **connect-button** 
```
<button connect-button="true">
  Connect wallet
</button>
```

### How to get information from contract
Add a CSS element with customized attributtion **function-name="<The view function name\>"**

For example, read contract name:
```
  <a function-name="name">
    Name
  </a>
```
If the read-only function needs inputs, add attribution **function-name="<The view function name\>" function-name-args-<The arg name\>=<The value of args\>**
For example, read token balance of address 0x5a3B85334612a18cCE4Eef4567c1DF543433AdC4:
```
  <h3 function-name="balanceOf" function-name-args-owner="0x5a3B85334612a18cCE4Eef4567c1DF543433AdC4">
    balanceOf
  </h3>
```

### How to interact with contract
Add a CSS element with customized attribution **function-name="<The write function name\>"**
If the function is payable, use attribution **function-name-value-in-eth="<The value of ethers of this txn/>"**

For example, the following part means calling mint function with quantity 1 and paying 0.000001 eth for this transaction.
```
  <button function-name="mint" function-name-value-in-eth="0.000001" function-name-args-quantity="1">
    Mint 1 with fixed price
  </button>
```
After click the button, a dialog will pop up. If the arugment has been assigned by attribution, user cannot change it, and input will be disabled.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Baseline connect wallet, read, write ability
- [x] Add customized field for user to input
- [ ] Add Additional framework support
- [ ] Add Additional Templates w/ Examples
- [ ] Add multi-chain support

See the [open issues](https://github.com/nftblackmagic/web3cdn/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@catchonlabs](https://twitter.com/catchonlabs) - info@catchonlabs.com

Project Link: [https://github.com/nftblackmagic/web3cdn](https://github.com/nftblackmagic/web3cdn)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/nftblackmagic/web3cdn.svg?style=for-the-badge
[contributors-url]: https://github.com/nftblackmagic/web3cdn/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nftblackmagic/web3cdn.svg?style=for-the-badge
[forks-url]: https://github.com/nftblackmagic/web3cdn/network/members
[stars-shield]: https://img.shields.io/github/stars/nftblackmagic/web3cdn.svg?style=for-the-badge
[stars-url]: https://github.com/nftblackmagic/web3cdn/stargazers
[issues-shield]: https://img.shields.io/github/issues/nftblackmagic/web3cdn.svg?style=for-the-badge
[issues-url]: https://github.com/nftblackmagic/web3cdn/issues
[license-shield]: https://img.shields.io/github/license/nftblackmagic/web3cdn.svg?style=for-the-badge
[license-url]: https://github.com/nftblackmagic/web3cdn/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://github.com/xiaozaa/web3-cdn-example
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Webflow-url]: https://web3-integration-website.webflow.io/