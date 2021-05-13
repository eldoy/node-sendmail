const mxmail = require('../index.js')

const mail = {
  from: '"Fred Foo 👻" <foo@example.com>',
  to: 'bar@ethereal.email, baz@ethereal.email',
  subject: 'Hello ✔',
  text: 'Are you ready?',
  html: '<b>Are you ready?</b>'
}

const config = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'virginia.cassin10@ethereal.email',
    pass: '1md9Xes49Nbfka6aFw'
  }
}

const mailer = mxmail(config)

it('should send email', async () => {
  const send = await mailer(mail)
  const r1 = send.delivered[0].result
  expect(r1.messageId).toBeDefined()
  expect(r1.envelope.to).toEqual(['bar@ethereal.email'])
  const r2 = send.delivered[1].result
  expect(r2.messageId).toBeDefined()
  expect(r2.envelope.to).toEqual(['baz@ethereal.email'])
})

it('should send email with CC and BCC', async () => {
  const mail2 = {
    cc: 'qux@ethereal.email',
    bcc: 'quux@ethereal.email',
    ...mail
  }
  const send = await mailer(mail2)
  const r1 = send.delivered[0].result
  expect(r1.messageId).toBeDefined()
  expect(r1.envelope.to).toEqual(['bar@ethereal.email'])
  const r2 = send.delivered[1].result
  expect(r2.messageId).toBeDefined()
  expect(r2.envelope.to).toEqual(['baz@ethereal.email'])
  const r3 = send.delivered[2].result
  expect(r3.messageId).toBeDefined()
  expect(r3.envelope.to).toEqual(['qux@ethereal.email'])
  const r4 = send.delivered[3].result
  expect(r4.messageId).toBeDefined()
  expect(r4.envelope.to).toEqual(['quux@ethereal.email'])
})

it('should generate a message ID', async () => {
  let id = mailer.id()
  expect(typeof id).toBe('string')

  id = mailer.id('vidar@test.com')
  expect(id.endsWith('test.com>')).toBe(true)

  id = mailer.id('Vidar <vidar@test.com>')
  expect(id.endsWith('test.com>')).toBe(true)
})
