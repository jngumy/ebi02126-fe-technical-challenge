## EBI02126 Frontend Technical Challenge

This is the source code and project to solve the EBI02126 Frontend Technical Challenge. The main goal is provide a way to compare the knockout effect of a list of genes amongst
different phenotyping systems.
The recommended approach to display this kind of data is using a heatmap so the user can
compare easily the relationship between genes, phenotypes and phenotype systems.



![Captura de pantalla 2023-05-08 161506](https://user-images.githubusercontent.com/56744971/236915279-db236efc-a3d6-4c12-a736-17881d2033bc.png)

![Captura de pantalla 2023-05-08 161437](https://user-images.githubusercontent.com/56744971/236915168-f9f06ad6-0b6d-4044-92e0-850df1d534eb.png)

Used tools: 
- React & Next.js :This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- Typescript as recommendation for the codebase.
- Nivo for data visualization. I found this library very well documented and the component api was flexible enough to work with the provided Dataset. I used `ResponsiveHeatMapCanvas` as the main visualization 
component
- [react-select](https://react-select.com/home) for the multi-select components (A flexible Select Input control for ReactJS with multiselect, autocomplete, async and creatable support). I used it in previous projects.
- [react-range](https://www.npmjs.com/package/react-range) for the range selector component.
- css for styling

## Some technical decisions
- I decided to use a nice feature from Next.js building two api endpoints as a real life scenario: one to get the data to display on the heatmap and another one to populate de multi-select dropdowns. 
Both are located under the  `pages/api` folder. Then to fecth those 2 endpoints, i used `useEffect` running once on the first page load. 
- I split the whole main logic between two hooks: `useFiltersOptionList` (handles the parsing-logic to populate the select components) and `useHeatMapData` (all the logic to convert the raw json data to match the input of the chosen data visualisation library and the filtering methods for the filter panel)  with the goal of improve the readability and usability of the code (and have it more clean and organized). Also it will be easier to mantain in the future.
- I tried to use High-order-functions like map, reduce and filter whenever i could.
- I used `ResponsiveHeatMapCanvas` instead of `ResponsiveHeatMap` to get a better performance - its well suited for large data sets as it does not impact DOM tree depth, however we'll lose the isomorphic ability and transitions/animations.

## Time
The challenge took me about 3-4 days to complete.


## Instructions

First, install project dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the landing page.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/staticdata](http://localhost:3000/api/staticdata) and  [http://localhost:3000/api/dropdownData](http://localhost:3000/api/dropdownData).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.



