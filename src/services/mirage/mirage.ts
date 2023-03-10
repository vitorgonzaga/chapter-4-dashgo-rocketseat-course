import { faker } from '@faker-js/faker';
import { ActiveModelSerializer, createServer, Factory, Model, Response } from "miragejs";

type User = {
  name: String;
  email: String;
  created_at: String;
}

export function makeServer() {
  let server = createServer({
    serializers: {
      application: ActiveModelSerializer
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        created_at() {
          return faker.date.recent(10)
        }
      })
    },

    seeds(server) {
      server.createList("user", 200)
    },

    routes() {

      this.namespace = "api"
      this.timing = 750

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page)
        const pageEnd = pageStart + Number(per_page)

        // const sortedUsers = schema.all('user').sort((a, b) => {
        //   return new Date(a).getTime() < new Date(b).getTime()
        // })

        const users = this.serialize(schema.all('user')).users
          .sort((a, b) => {
            return new Date(a).getTime() - new Date(b).getTime()
          })
          .slice(pageStart, pageEnd)

        // const users = schema.all('user').models.map(({id, name, email, created_at }) => (
        //   {
        //     id,
        //     name,
        //     email,
        //     created_at
        //   }
        // ))

        // console.log('users', users, typeof users)

        // const resp = Object.entries(users).slice(pageStart, pageEnd).map(user => user[1])
        // console.log('resp', resp, typeof resp)

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )

      })

      this.get('/users/:id')
      this.post('/users')

      this.namespace = ""
      this.passthrough()
    },
  })

  return server
}
