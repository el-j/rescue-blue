export interface DecisionMaker {
  name: string
  roleKey: string
  email: string
  status: 'supported' | 'opposed' | 'no_answer'
}

export const DECISION_MAKERS: Record<'oeffentlich' | 'privat' | 'rundfunkrat', DecisionMaker[]> = {
  oeffentlich: [
    {
      name: 'Florian Hager',
      roleKey: 'roleArdChair',
      email: 'intendanz@hr.de',
      status: 'no_answer',
    },
    {
      name: 'Bettina Schausten',
      roleKey: 'roleZdfChefred',
      email: 'chefredaktion@zdf.de',
      status: 'no_answer',
    },
    {
      name: 'Marcus Bornheim',
      roleKey: 'roleTagesschauChefred',
      email: 'redaktion@tagesschau.de',
      status: 'no_answer',
    },
    {
      name: 'Dr. Norbert Himmler',
      roleKey: 'roleZdfIntendant',
      email: 'intendantenbuero@zdf.de',
      status: 'no_answer',
    },
    {
      name: 'Katrin Vernau',
      roleKey: 'roleWdrIntendant',
      email: 'intendanz@wdr.de',
      status: 'no_answer',
    },
    {
      name: 'Hendrik Lünenborg',
      roleKey: 'roleNdrIntendant',
      email: 'intendantenbuero@ndr.de',
      status: 'no_answer',
    },
  ],
  privat: [
    {
      name: 'Sven Gösmann',
      roleKey: 'roleDpaChefred',
      email: 'chefredaktion@dpa.com',
      status: 'no_answer',
    },
    {
      name: 'Helge Fuhst',
      roleKey: 'roleSpringerChefred',
      email: 'kontakt@welt.de',
      status: 'no_answer',
    },
    {
      name: 'Christian Schleker',
      roleKey: 'roleRtlChefred',
      email: 'zentrale@rtlnews.de',
      status: 'no_answer',
    },
    {
      name: 'Sven Pietsch',
      roleKey: 'roleProsiebenChefred',
      email: 'info@seven.one',
      status: 'no_answer',
    },
    {
      name: 'Dirk Kurbjuweit',
      roleKey: 'roleSpiegelChefred',
      email: 'chefredaktion@spiegel.de',
      status: 'no_answer',
    },
    {
      name: 'Giovanni di Lorenzo',
      roleKey: 'roleZeitChefred',
      email: 'chefredaktion@zeit.de',
      status: 'no_answer',
    },
  ],
  rundfunkrat: [
    {
      name: 'Rolf Zurbrüggen',
      roleKey: 'roleWdrCouncil',
      email: 'rundfunkrat@wdr.de',
      status: 'no_answer',
    },
    {
      name: 'Nico Fickinger',
      roleKey: 'roleNdrCouncil',
      email: 'info@ndr-rundfunkrat.de',
      status: 'no_answer',
    },
    {
      name: 'Gerda Hasselfeldt',
      roleKey: 'roleZdfCouncil',
      email: 'gremienbuero@zdf.de',
      status: 'no_answer',
    },
  ],
}
