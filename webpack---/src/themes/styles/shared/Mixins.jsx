// Those mixins are required for proper wkhtmltopdf rendering

// usage: ${flex('1 1 auto')}
export const flex = (value) => `
  // wkhtmltopdf required fallback
  -webkit-box-flex: ${value[0]};
  flex: ${value};
`

const mixins = {
  flex,
}

export default mixins
