import { ExternalLink, Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import { Link, useLocation, useNavigate } from 'react-router'

import { mdxComponents } from '@/components/mdx/mdx-components'
import { useLocale } from '@/components/providers/locale-provider'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { teamMembers } from '@/content/data/collections'
import { formatMessage } from '@/lib/i18n'

function TeamLinkIcon({ link }) {
  const normalizedLabel = link.label.toLowerCase()

  if (link.href.startsWith('mailto:')) {
    return <Mail aria-hidden="true" className="size-5" />
  }

  if (link.href.includes('linkedin.com') || normalizedLabel === 'linkedin') {
    return <FaLinkedin aria-hidden="true" className="size-5" />
  }

  if (
    link.href.includes('scholar.google.') ||
    normalizedLabel.includes('google scholar')
  ) {
    return <SiGooglescholar aria-hidden="true" className="size-5" />
  }

  return <ExternalLink aria-hidden="true" className="size-5" />
}

function TeamLinks({ links, className = '' }) {
  if (links.length === 0) {
    return null
  }

  return (
    <TooltipProvider delay={300}>
      <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
        {links.map((link) => (
          <li className="relative z-20" key={link.href}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    aria-label={link.label}
                    className="inline-flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-[#008557]/40 hover:text-[#008557] focus-visible:ring-2 focus-visible:ring-[#008557]/40 focus-visible:outline-none"
                    href={link.href}
                    rel="noreferrer"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                  />
                }
              >
                <TeamLinkIcon link={link} />
              </TooltipTrigger>
              <TooltipContent>{link.label}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  )
}

function TeamBiography({ member, locale, className = '' }) {
  const translation = member.translations[locale]
  const Body = member.body?.[locale]

  if (Body) {
    return (
      <div className={className}>
        <Body components={mdxComponents} />
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {translation.biography.map((paragraph, index) => (
        <p className="leading-7 text-muted-foreground" key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  )
}

function TeamMemberCard({ member, locale, messages, former = false }) {
  const location = useLocation()
  const translation = member.translations[locale]
  const profileLabel = formatMessage(messages.team.openProfile, {
    name: member.name,
  })

  return (
    <Card
      className="group relative scroll-mt-36 gap-0 py-0 transition-[box-shadow,--tw-ring-color] duration-200 target:ring-2 target:ring-[#008557] hover:shadow-[0_14px_38px_rgba(0,133,87,0.2)] hover:ring-[#008557]/40"
      id={member.id}
      role="article"
    >
      <CardContent className="grid gap-6 p-6 sm:grid-cols-[10rem_1fr]">
        <img
          alt={member.image.alt ?? member.name}
          className="aspect-square w-40 rounded-xl object-cover object-top shadow-sm"
          height={member.image.height}
          loading="lazy"
          src={member.image.src}
          width={member.image.width}
        />
        <div className="min-w-0">
          <CardHeader className="px-0">
            <CardTitle>
              {former ? (
                <h3 className="text-2xl font-semibold tracking-tight">
                  {member.name}
                </h3>
              ) : (
                <h2 className="text-2xl font-semibold tracking-tight">
                  {member.name}
                </h2>
              )}
            </CardTitle>
            {translation.role ? (
              <CardDescription className="font-medium">
                {translation.role}
              </CardDescription>
            ) : null}
          </CardHeader>

          <TeamBiography className="mt-5" locale={locale} member={member} />

          <CardFooter className="relative z-20 mt-6 border-0 bg-transparent p-0">
            <TeamLinks links={member.links} />
          </CardFooter>
        </div>
      </CardContent>

      <Link
        aria-label={profileLabel}
        className="absolute inset-0 z-10 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#008557] focus-visible:ring-inset"
        id={`profile-trigger-${member.id}`}
        preventScrollReset
        to={{
          pathname: location.pathname,
          search: location.search,
          hash: `#${member.id}`,
        }}
      >
        <span className="sr-only">{profileLabel}</span>
      </Link>
    </Card>
  )
}

function TeamProfileDialog({ member, locale, messages, open, onOpenChange }) {
  if (!member) {
    return null
  }

  const translation = member.translations[locale]

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="h-[calc(100svh-1rem)] w-[calc(100vw-1rem)] max-w-none grid-rows-[minmax(0,1fr)] overflow-hidden p-5 sm:h-[50svh] sm:w-[70vw] sm:max-w-[70vw] sm:p-7"
        closeLabel={messages.dialog.close}
      >
        <div className="grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-5 md:grid-cols-[minmax(12rem,16rem)_1fr] md:grid-rows-1 md:gap-8">
          <img
            alt={member.image.alt ?? member.name}
            className="aspect-square h-full max-h-48 w-full max-w-48 rounded-2xl object-cover object-top shadow-md md:max-h-64 md:max-w-64"
            height={member.image.height}
            src={member.image.src}
            width={member.image.width}
          />

          <div className="flex min-h-0 min-w-0 flex-col">
            <DialogHeader className="shrink-0 pr-8">
              <DialogTitle className="text-3xl leading-tight tracking-tight">
                {member.name}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {formatMessage(messages.team.profileDescription, {
                  name: member.name,
                })}
              </DialogDescription>
            </DialogHeader>

            {translation.role ? (
              <p className="mt-2 shrink-0 font-medium text-muted-foreground">
                {translation.role}
              </p>
            ) : null}

            <TeamBiography
              className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-3"
              locale={locale}
              member={member}
            />

            <TeamLinks className="mt-5 shrink-0" links={member.links} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function memberIdFromHash(hash) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ''))
  } catch {
    return ''
  }
}

export function TeamList() {
  const { locale, messages } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()
  const currentMembers = teamMembers.filter((member) => !member.former)
  const formerMembers = teamMembers.filter((member) => member.former)
  const selectedMember = teamMembers.find(
    (member) => member.id === memberIdFromHash(location.hash),
  )

  if (teamMembers.length === 0) {
    return null
  }

  function closeProfile() {
    const triggerId = selectedMember
      ? `profile-trigger-${selectedMember.id}`
      : null

    navigate(
      { pathname: location.pathname, search: location.search, hash: '' },
      { preventScrollReset: true, replace: true },
    )

    if (triggerId) {
      window.requestAnimationFrame(() => {
        document.getElementById(triggerId)?.focus()
      })
    }
  }

  function handleOpenChange(nextOpen) {
    if (!nextOpen) {
      closeProfile()
    }
  }

  return (
    <div>
      <div className="space-y-6">
        {currentMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            locale={locale}
            member={member}
            messages={messages}
          />
        ))}
      </div>

      {formerMembers.length > 0 ? (
        <section className="mt-14 border-t pt-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            {messages.team.former}
          </h2>
          <div className="mt-8 space-y-6">
            {formerMembers.map((member) => (
              <TeamMemberCard
                former
                key={member.id}
                locale={locale}
                member={member}
                messages={messages}
              />
            ))}
          </div>
        </section>
      ) : null}

      <TeamProfileDialog
        locale={locale}
        member={selectedMember}
        messages={messages}
        onOpenChange={handleOpenChange}
        open={Boolean(selectedMember)}
      />
    </div>
  )
}
