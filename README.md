# rtmx

The idea explored here:

htmx allows us to do network requests on any dom element. So I thought may be:
- I click on a button, it dispatches a GET request to a /todo route.
- todo route takes a react application and renders it to string and then send it back as response as html
- use htmx's swapping technique to render that react string onto a selected html dom node by overriding it to include React APIs

But it does not work as the string does not contain all the event handlers and yada yada. I can off course render the string as is using htmx but it will not be interactive.

Well I atleast explored a thought experiment of mine.

The idea is worthy to explore but requires a lot of code for it to work. Let's see if can explore it in the future. 
