import { ADDRESS, DELIVER, ENGAGEMENTS, INFO_EMAIL, VALUE_PROPS } from './site'

export function Capability() {
  return (
    <section className="cap" id="capability">
      <div className="cap__intro">
        <hr className="cap__rule" />
        <h2 className="t-h2 mask-group">
          <span className="mask-line"><span className="mask-line__inner">Capability</span></span>
        </h2>
      </div>

      <div className="cap-lead">
        <h3 className="t-h2">Built to extend your technology team.</h3>
        <div className="cap-lead__copy">
          <p className="t-lg">
            USKODX Corp is a New York-based technology services company that helps organizations
            modernize infrastructure, accelerate software delivery, strengthen network and security
            operations, and expand technical capacity.
          </p>
          <p className="t-sm">
            We support direct clients, managed service providers, systems integrators and prime
            contractors through flexible project delivery, dedicated teams, staff augmentation and
            managed technical services.
          </p>
        </div>
      </div>

      <ul className="cap-props">
        {VALUE_PROPS.map((prop) => (
          <li key={prop.title}>
            <h4 className="t-lg t-lg--med">{prop.title}</h4>
            <p className="t-sm">{prop.body}</p>
          </li>
        ))}
      </ul>

      <div className="cap-block">
        <p className="t-label t-label--med">01 / What we deliver</p>
        <h3 className="t-h2">Engineering connected systems</h3>
        <p className="cap-block__lede t-lg">
          Technical capabilities across the platforms, applications and operations your
          organization depends on.
        </p>
        <div className="cap-deliver">
          {DELIVER.map((group) => (
            <article key={group.n}>
              <p className="t-label">{group.n}</p>
              <h4 className="t-lg t-lg--med">{group.title}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="cap-market">
          <span className="t-label t-label--med">Market-aligned delivery</span>
          <span className="t-sm">
            Cloud and digital infrastructure, cybersecurity, network modernization, software and
            application modernization, DevOps and managed technical services.
          </span>
        </p>
      </div>

      <div className="cap-work">
        <p className="t-label t-label--med">02 / How we work</p>
        <h3 className="t-h2">Flexible delivery.<br /><span className="cap-work__accent">Enterprise focus.</span></h3>
        <p className="cap-block__lede t-lg">
          Specialized skills, additional engineering capacity or an execution partner for defined
          initiatives.
        </p>
        <ol className="cap-models">
          {ENGAGEMENTS.map((model) => (
            <li key={model.n}>
              <span className="t-label">{model.n}</span>
              <div>
                <h4 className="t-lg t-lg--med">{model.title}</h4>
                <p className="t-sm">{model.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="cap-close">
        <p className="t-label t-label--med">Let&apos;s build together</p>
        <div className="cap-close__grid">
          <p className="t-lg t-lg--med">
            {ADDRESS[0]}
            <span className="cap-close__addr t-sm">
              {ADDRESS.slice(1).join(', ')}
            </span>
          </p>
          <p className="t-lg">
            <a href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a>
          </p>
          <a className="pill pill--solid" href="#start" data-start>Start a project</a>
        </div>
      </div>
    </section>
  )
}
