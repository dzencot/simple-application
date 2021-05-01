import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/angular'

// import userEvent from '@testing-library/user-event';
import { APP_BASE_HREF } from '@angular/common';
import faker from 'faker';
import { setupServer } from 'msw/node'
import { rest } from 'msw';

import { AppComponent } from './app.component'
import { AppModule } from './app.module';

describe('AppComponent', () => {
  const persons = new Array(10).fill(null).map(() => (
    {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
    }
  ));

  const server = setupServer(
    rest.get('/persons', (req, res, ctx) => {
      return res(ctx.json(persons));
    }),
    rest.post('/person', (req, res, ctx) => {
      return res(ctx.body(''));
    })
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('just init', async () => {
    await render(AppComponent, {
      imports: [ AppModule ],
      providers: [ { provide: APP_BASE_HREF, useValue : '/' } ],
      excludeComponentDeclaration: true,
    });

    for(const person of persons) {
      const firstName = await waitFor(() => screen.getByText(person.firstname));
      expect(firstName).toBeInTheDocument();
      const lastName = await waitFor(() => screen.getByText(person.lastname));
      expect(lastName).toBeInTheDocument();
    }
  });

  // test('add person', async () => {
  //   await render(AppComponent, {
  //     imports: [ AppModule ],
  //     providers: [ { provide: APP_BASE_HREF, useValue : '/' } ],
  //     excludeComponentDeclaration: true,
  //   });

  //   const firstName = faker.name.firstName();
  //   const lastName = faker.name.lastName();
  //   userEvent.type(screen.getByRole('textbox', { name: 'firstname' }), firstName);
  //   userEvent.type(screen.getByRole('textbox', { name: 'lastname' }), lastName);
  //   userEvent.click(screen.getByRole('button', { name: /submit/i }));

  //   const firstNameAdded = await waitFor(() => screen.getByText(firstName));
  //   expect(firstNameAdded).toBeInTheDocument();
  //   const lastNameAdded = await waitFor(() => screen.getByText(lastName));
  //   expect(lastNameAdded).toBeInTheDocument();
  // });
});
