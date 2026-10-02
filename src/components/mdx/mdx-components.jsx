import { Link } from 'react-router'

const externalProtocol = /^(?:https?:)?\/\//

function MdxLink({ href = '', ...props }) {
  if (externalProtocol.test(href)) {
    return (
      <a
        className="font-medium underline underline-offset-4"
        href={href}
        rel="noreferrer"
        target="_blank"
        {...props}
      />
    )
  }

  return (
    <Link
      className="font-medium underline underline-offset-4"
      to={href}
      {...props}
    />
  )
}

export const mdxComponents = {
  a: MdxLink,
  h2: (props) => (
    <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b px-3 py-2 font-semibold" {...props} />,
  td: (props) => <td className="border-b px-3 py-2" {...props} />,
}
