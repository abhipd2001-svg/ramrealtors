# Ram Realtors website

A lightweight, responsive static website for Ram Realtors, built with HTML, CSS and vanilla JavaScript. There are no package dependencies or build step; the project is ready to publish to Netlify.

## Run it locally

Open `index.html` in a browser to explore the design. For a local web server, open PowerShell in this folder and run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`. Stop the server with `Ctrl+C`.

## Configure business contact details

Edit `assets/js/config.js` and replace the empty strings for `phone`, `whatsapp`, and `email` with genuine business contact information. Phone links, WhatsApp buttons, and email links remain hidden until those details are set. WhatsApp should use the international country code and digits only, for example `91` followed by the real mobile number; do not include a `+`, spaces or punctuation.

Do not add an address unless it is confirmed and authorized for publication. The contact form remains available independently of these optional contact links.

## Property enquiries

This site intentionally does not publish property listings, prices, or search filters. Visitors share their requirements in the property enquiry form; Ram Realtors can then discuss suitable current options and share relevant property details directly. No property inventory file or listing images are required.

## Netlify deployment

1. Create a Netlify account and choose **Add new site**.
2. For a quick first deployment, drag the project folder (containing `index.html`) into Netlify Drop. For ongoing updates, push the folder to a GitHub repository and import that repository into Netlify.
3. No build command is needed. The publish directory is the project root (`.`), already specified in `netlify.toml`.
4. For Git-based deploys, leave the build command empty and set the publish directory to `.` if Netlify does not detect the supplied configuration.
5. In the Netlify site dashboard, open **Forms** and ensure form detection is enabled. Redeploy after enabling it so Netlify can scan the three static HTML forms (`property-search`, `property-owner`, and `general-inquiry`).
6. To receive submission notifications, configure Netlify form-submission email notifications after deployment. In the site's notification settings, add a form submission notification for each of the three form names and enter the intended recipient address or addresses directly in the Netlify dashboard. Keep private recipient addresses out of this repository. This dashboard configuration is required; a static website cannot send email directly by itself.
7. Submit each form on the deployed site and verify that the inline success message appears and the submission is visible in Netlify Forms. The form stays on the same page; its confirmation appears only after Netlify accepts the POST. If the request fails, the form shows an error instead. Forms cannot collect leads when browsing files directly from disk.
8. Verify the configured email notifications reach both inboxes by submitting a test inquiry. Check spam folders and confirm notification settings if needed.
9. Add verified phone, email and WhatsApp details in `assets/js/config.js`. Test each contact action on the deployed site.
10. Replace `ramrealtors.in` in the canonical URLs, `robots.txt` and `sitemap.xml` with the real production website URL. The site includes no invented address, phone number, ratings, property inventory, testimonials or office map.
11. For a custom domain, configure it from Netlify's domain settings; domain registration may have a separate cost. Netlify plan limits and features can change over time.

The site does not provide a private property-management dashboard or persist inquiries in the visitor's browser. Submissions are handled by Netlify Forms after deployment; email delivery depends on enabling the notification recipients in the Netlify dashboard. WhatsApp is an optional user-initiated alternative once its real business number has been configured. A Google Business Profile is managed separately and should only be created if the business meets Google's current eligibility requirements.
