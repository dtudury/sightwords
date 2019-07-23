import { h, watchSetChildren } from '//unpkg.com/horseless/dist/horseless.esm.js'
import model from './model.js'
import { ENROLLED, UNENROLLED, ALL } from './constants.js'
import { memoizeCourse } from './controller.js'
import { maybeSelected } from './view.js'

navigator.serviceWorker.register('/sw.js')

watchSetChildren(document.body, h`
<header class="topnav">
  <h1>
    <svg focusable="false" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
    <img src="/site-config/favicon-32x32.png" />
    Rememberism
  </h1>
</header>

<nav class="sidenav">
  <a class=${maybeSelected} href=${ENROLLED}>enrolled</a>
  <a class=${maybeSelected} href=${UNENROLLED}>unenrolled</a>
  <a class=${maybeSelected} href=${ALL}>all courses</a>
</nav>

<main>
  <section class="enrolled">
${() => Object.keys(model.catalog || {}).map(header => memoizeCourse(model.catalog[header], course => h`
    <article class="course">
      <header>
        <h1>${() => course.header}</h1>
        <h2>${() => course.subhead}</h2>
      </header>
      <section class="supporting">${() => course.supporting}</section>
    </article>
`))}
  </section>
</main>

<footer>
  Copyright Info
</footer>
`)
