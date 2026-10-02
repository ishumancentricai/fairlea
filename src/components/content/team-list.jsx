import { ExternalLink, Mail } from 'lucide-react'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import { teamMembers } from '@/content/data/collections'

function TeamLinkIcon({ href }) {
  if (href.startsWith('mailto:')) {
    return <Mail aria-hidden="true" className="size-4" />
  }

  if (href.includes('linkedin.com')) {
    return <ExternalLink aria-hidden="true" className="size-4" />
  }

  return null
}

function TeamMember({ member, locale, former = false }) {
  const translation = member.translations[locale]
  const Body = member.body?.[locale]

  return (
    <section className="grid gap-6 sm:grid-cols-[10rem_1fr]">
      <img
        alt={member.image.alt ?? member.name}
        className="aspect-square w-40 rounded-xl object-cover object-top"
        height={member.image.height}
        loading="lazy"
        src={member.image.src}
        width={member.image.width}
      />
      <div>
        {former ? (
          <h3 className="text-2xl font-semibold tracking-tight">
            {member.name}
          </h3>
        ) : (
          <h2 className="text-2xl font-semibold tracking-tight">
            {member.name}
          </h2>
        )}
        {translation.role ? (
          <p className="mt-1 font-medium text-muted-foreground">
            {translation.role}
          </p>
        ) : null}
        {Body ? (
          <Body components={mdxComponents} />
        ) : (
          <div className="mt-4 space-y-4">
            {translation.biography.map((paragraph) => (
              <p className="leading-7 text-muted-foreground" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {member.links.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
            {member.links.map((link) => (
              <li key={link.href}>
                <a
                  className="inline-flex items-center gap-1.5 underline underline-offset-4"
                  href={link.href}
                  rel="noreferrer"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                >
                  <TeamLinkIcon href={link.href} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export function TeamList() {
  const { locale, messages } = useLocale()
  const currentMembers = teamMembers.filter((member) => !member.former)
  const formerMembers = teamMembers.filter((member) => member.former)

  if (teamMembers.length === 0) {
    return null
  }

  return (
    <div>
      <div className="space-y-10">
        {currentMembers.map((member) => (
          <TeamMember key={member.id} locale={locale} member={member} />
        ))}
      </div>

      {formerMembers.length > 0 ? (
        <section className="mt-14 border-t pt-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            {messages.team.former}
          </h2>
          <div className="mt-8 space-y-10">
            {formerMembers.map((member) => (
              <TeamMember
                former
                key={member.id}
                locale={locale}
                member={member}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
