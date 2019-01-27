import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

let wrapper;
describe('App', () => {
    let mockFilms;

  beforeEach(() => {
    wrapper = shallow(<App/>); 
  })

  // Test allFetchCalls
  it('will make a fetch (GET) request when fetchFilms() is invoked', async () => {
    mockFilms = {
      title: 'Luck Key',
      scrollText: 'whee whee whee',
      episode: 5,
    };

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockFilms)
    }))

    await wrapper.instance().fetchFilms();
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.co/api/films/1')
  });

  it('after successful fetchFilms request, it will set state with returned films', async () => {
    mockFilms = {
      title: 'Luck Key',
      opening_crawl: 'whee whee whee',
      episode_id: 5,
    };

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockFilms),
      status: 200,
    }))
    await wrapper.instance().fetchFilms();

    expect(wrapper.state().films).toEqual({
      title: 'Luck Key',
      scrollText: 'whee whee whee',
      episode: 5,
    });
  })

  it('after failed fetchFilms request, it will set state with error message', async () => {
    // This is not the best test because the fetchService function really only throws
    // an error when status code >= 300. 
    // This mocked fetch call bypasses that logic by returning a rejected promise.
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('some error')))
    await wrapper.instance().fetchFilms();
    expect(wrapper.state().errorMessage).toEqual('some error');
  })

  it('after failed fetchFilms request, it will set state with error message', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 404,
    }))
    await wrapper.instance().fetchFilms();
    expect(wrapper.state().errorMessage).toEqual('Failed network request');
  })
})



