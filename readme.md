Dear Morello

I am happy to present you my test application. 

Architecture:

API: ASP.NET CORE API. JSON files are used to store tax brackets data
UI: AngularJS.

Settings:

UI: settings can be found in env.js file. 

RUN on dev machine with dotnet:
1. start API by running run_api.bat
2. start UI by running run_ui.bat

Deficiencies:

1. this is my first full project on AngularJs and my code might not be top notch. I experienced weird behavior of input boxes when both they and sliders were connected to the same models. To solve this issue, I connected them to separate models and implemented sync on ng_change event. I am sure, that this can be done much better
2. I was not able to repeat the chart as shown on mochup. I could not find a way to add a reference bar with separate dataset. I ended up implementing the stacked graph only. Nor was I able to implement legend as displayed. I tried two libraries: Plotly and Chart.JS
3. For development I only used brackets, specified of the page, provided in the test document. While testing I noticed that I couldn't find two online calculators that would prodice the same result. I also later found out that there is also a Federal Basic Amount with zero tax (but only for a certain income). I chose not to prolong the development to implement it.
