import { PageEvent, SignatureReflection } from 'typedoc';
import { MarkdownThemeContext } from '../../src';
import { formatContents } from '../../src/utils/format';
import { TestApp } from '../test-app';

describe(`Generics:`, () => {
  let testApp: TestApp;
  let context: MarkdownThemeContext;

  beforeAll(async () => {
    testApp = new TestApp(['generics.ts']);
    await testApp.bootstrap();
    context = testApp.getRenderContext();
    TestApp.stubHelpers(['toc', 'breadcrumbs', 'hierarchy', 'returns']);
    jest.spyOn(context, 'sourcesPartial').mockReturnValue('[sources]');
    jest.spyOn(context, 'groupsPartial').mockReturnValue('[groups]');
    jest.spyOn(context, 'urlTo').mockReturnValue('[urlTo]');
  });

  test(`should compile class with type params`, () => {
    expect(
      formatContents(
        context.reflectionTemplate({
          model: testApp.findReflection('ClassWithTypeParams'),
          project: testApp.project,
        } as PageEvent<any>),
      ),
    ).toMatchSnapshot();
  });

  test(`should compile function with a simple type param'`, () => {
    expect(
      formatContents(
        context.signaturePartial(
          (testApp.findReflection('functionWithTypeParam') as any)
            .signatures[0] as SignatureReflection,
        ),
      ),
    ).toMatchSnapshot();
  });

  test(`should compile function with complex type params'`, () => {
    expect(
      formatContents(
        context.signaturePartial(
          (testApp.findReflection('functionWithTypeParams') as any)
            .signatures[0] as SignatureReflection,
        ),
      ),
    ).toMatchSnapshot();
  });

  test(`should compile type with nested generics'`, () => {
    expect(
      formatContents(
        context.signaturePartial(
          testApp.findReflection('nestedGenerics') as any,
        ),
      ),
    ).toMatchSnapshot();
  });

  test(`should compile generics with defaults'`, () => {
    expect(
      formatContents(
        context.signaturePartial(
          testApp.findReflection('genericsWithDefaults') as any,
        ),
      ),
    ).toMatchSnapshot();
  });
});
