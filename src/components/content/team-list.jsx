import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { teamMembers } from '@/content/data/collections'

export function TeamList() {
  const { locale } = useLocale()

  if (teamMembers.length === 0) {
    return null
  }

  return (
    <div className="space-y-10">
      {teamMembers.map((member) => {
        const translation = member.translations[locale]
        const Body = member.body?.[locale]

        return (
          <section
            className="grid gap-6 sm:grid-cols-[10rem_1fr]"
            key={member.id}
          >
            <img
              alt={member.image.alt ?? member.name}
              className="aspect-square w-40 rounded-xl object-cover object-top"
              loading="lazy"
              src={member.image.src}
            />
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {member.name}
              </h2>
              <p className="mt-1 font-medium text-muted-foreground">
                {translation.role}
              </p>
              {Body ? (
                <Body components={mdxComponents} />
              ) : (
                <p className="mt-4 leading-7 text-muted-foreground">
                  {translation.biography}
                </p>
              )}
              {member.links.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
                  {member.links.map((link) => (
                    <li key={link.href}>
                      <a
                        className="underline underline-offset-4"
                        href={link.href}
                        rel="noreferrer"
                        target={
                          link.href.startsWith('http') ? '_blank' : undefined
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        )
      })}
    </div>
  )
}
