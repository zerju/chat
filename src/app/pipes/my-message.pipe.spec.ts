import { MyMessagePipe } from './my-message.pipe';

describe('MyMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new MyMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
