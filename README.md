# ADAPTIVE FLOW FIELD

<br> AdaptiveFlowField is a website and a small JS script that allows you to make FlowFields based on perlin noise that can look like this :

<table>
  <tr>
    <td><img src="images/resultat1.png"></td>
    <td><img src="images/resultat2.png"></td>
  </tr>
  <tr>
    <td><img src="images/resultat3.png"></td>
    <td><img src="images/resultat4.png"></td>
  </tr>
</table>  

<br> AdaptiveFlowField aims to both let non-coders have fun on the website and find a cool background if they want, and also let coders use the code to implement in their own projects/, portfolios or other things.

<br>

## WHAT'S IN THIS REPO

This repository contains multiple assets to let people start up with flow fields, here is a list of it :
- a <a href="https://chevalmonsieur.github.io/AdaptiveFlowField/">website</a> that shows how the script can be implemented and let you simply ``find your favorite`` flow field
- a commented ``JS script`` including various parameters that can be updated in realtime to easily get your perfect flow field simulation 
- a shorter version of this script ``(17 lines)`` to show that it's not that hard to implement
- this ``readme.md`` to explain how everything works

<br>

## HOW TO PUT IT ON YOUR OWN WEBSITE

Get started quickly in 5 simple steps :
- fork this repository anywhere on your computer
- add these two lines just after the start of your body in HTML :
````
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
<script src="main.js"></script>
````
- add a ``<main>`` tag where you want the flow field to appear (a ``<canvas>`` tag will automatically appear and take full width)
- copy the ``main.js`` script in the fork and add it in the same directory as your html file
- modify the lines 24-28 and 91-95 to make the canva take the height of your choice
- IT'S DONE

If you want to set a specific flow field you found on the website, just modify values at the initialisation (first lines of code in ``main.js``) to the one you found with the website.

<br>

## WHAT DO THE VARIABLES CHANGE

here is a list of all the variable in order and their specification :
- nbPoints : choose how many particles will be drawn each frame in the canvas, make sure the intended audience has a good enough cpu to handle the amount of particles you set. (go with values between <b>1000</b> and <b>5000</b> particles to be safe)
- A FINIR

