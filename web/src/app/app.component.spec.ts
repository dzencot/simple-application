import { render, screen, fireEvent } from '@testing-library/angular'
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component'
import { AppModule } from './app.module';

describe('AppComponent', () => {
  test('just init', async () => {
    await render(AppComponent, {
      imports: [ AppModule ],
      providers: [ { provide: APP_BASE_HREF, useValue : '/' } ],
      excludeComponentDeclaration: true,
    });

    expect(screen.getByText('First Name'));
  });
});
