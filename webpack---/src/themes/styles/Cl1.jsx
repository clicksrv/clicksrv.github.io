import { createGlobalStyle } from 'styled-components'

const style = createGlobalStyle`
  .cv-container {
    .cv-content {
      padding: 5em 10%;
    }

    h2, h3, h4, h5, h6 {
      font-weight: normal;

      margin-top: 0;
      margin-bottom: 0.25em;
    }

    h1, h2, h3 {
      text-align: center;
    }

    h1 {
      color: black;
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 250%;
      font-weight: normal;
      line-height: 1.15em;
      text-transform: uppercase;

      margin: 0;
    }

    h2, h3 {
      font-family: ${({ bodyFontFamily }) => bodyFontFamily};
      font-size: 150%;
      color: black;
    }

    h4, h5, h6 {
      font-size: 115%;

      margin: 0 0 5px 0;
    }

    h5 {
      font-style: italic;
    }

    p {
      margin: 0 0 ${({ articleMargins }) => articleMargins};
    }

    article {
      clear: both;

      margin-bottom: 0.75em;

      .article-headings {
        float: left;
        margin-right: 1%;
        width: 21%;
      }

      .article-body {
        float: left;
        width: 78%;
      }

      .article-body {
        margin: 0;
      }

      &:after {
        clear: both;
        content: " ";
        display: block;
        position: relative;
      }
    }
  }

  .pdf {
    .cv-container {
      .cv-content {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
`

export default style
