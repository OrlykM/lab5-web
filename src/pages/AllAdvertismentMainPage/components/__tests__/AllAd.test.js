import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AllAd from '../AllAd';

describe('AllAd component', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        global.fetch.mockClear();
    });

    test('renders the advertisement data correctly', async () => {
        const mockData = [
            {
                title: 'Ad Title 1',
                about: 'Ad Description 1',
                publishingDate: '2023-05-22',
                status: 'active',
            },
            {
                title: 'Ad Title 2',
                about: 'Ad Description 2',
                publishingDate: '2023-05-21',
                status: 'closed',
            },
        ];

        jest.spyOn(window, 'fetch').mockImplementation((url) => {
            if (url === 'http://localhost:5000/advertisement/public') {
                return Promise.resolve({
                    json: () => Promise.resolve(mockData),
                });
            }

            if (url === 'http://localhost:5000/advertisement/local') {
                return Promise.resolve({
                    json: () => Promise.resolve([]),
                });
            }
        });

        render(
            <MemoryRouter>
                <AllAd />
            </MemoryRouter>
        );

        await screen.findByText('Ad Title 1');

        expect(screen.getByText('Ad Title 1')).toBeInTheDocument();
        expect(screen.getByText('Ad Description 1')).toBeInTheDocument();
        expect(screen.getByText('2023-05-22')).toBeInTheDocument();

        expect(screen.queryByText('Ad Title 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Ad Description 2')).not.toBeInTheDocument();

        userEvent.click(screen.getByText('Show'));

        expect(sessionStorage.getItem('ArticleId')).toBe('undefined');
        expect(sessionStorage.getItem('IsLocal')).toBe('0');
    });
});