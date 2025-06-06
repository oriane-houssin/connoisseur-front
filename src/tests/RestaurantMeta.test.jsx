import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestaurantMeta from '../composants/RestaurantMeta';
import API from '../services/api';

// Mock de l'API pour les tests
jest.mock('../services/api', () => ({
    get: jest.fn(() => Promise.resolve({ data: { favorite: false } })), // Valeur par défaut
    post: jest.fn(() => Promise.resolve({ success: true })),
    delete: jest.fn(() => Promise.resolve({ success: true })),
}));

// Mock l'alerte pour éviter qu'elle ne bloque les tests
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('RestaurantMeta', () => {
    const mockUser = { id: 1, username: 'testuser' };
    const mockRestaurantId = "test-restaurant-id";

    const commonProps = {
        r_id: mockRestaurantId,
        user: mockUser,
        average: 3,
        cuisine: "Française",
        wheelchair: "yes",
        vegan: "yes",
        vegetarian: "no",
        delivery: "yes",
        takeaway: "no",
        onReviewSubmittedExternally: jest.fn(),
    };

    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        API.get.mockClear();
        API.post.mockClear();
        API.delete.mockClear();
        mockAlert.mockClear();
        commonProps.onReviewSubmittedExternally.mockClear();

        // --- Mock initial API.get calls for both RestaurantMeta and Restaurant3Butons ---
        // RestaurantMeta's useEffect (for userRating)
        API.get.mockImplementation((url) => {
            if (url === `ratings/${mockRestaurantId}`) {
                return Promise.resolve({data: {userRating: 0}}); // Default: no user rating
            }
            // Restaurant3Butons's useEffect (for initial favorite status)
            if (url === `favorites/${mockRestaurantId}`) {
                return Promise.resolve({data: {favorite: false}}); // Default: not favorited
            }
            // Restaurant3Butons's useEffect (for "visited" and "to visit" lists)
            if (url === `/lists`) {
                return Promise.resolve({
                    data: [
                        {id: 101, name: 'restaurants visités'},
                        {id: 102, name: 'restaurants à visiter'},
                    ],
                });
            }
            // Restaurant3Butons's useEffect (for checking if restaurant is in lists)
            if (url === `lists/101/restaurants/${mockRestaurantId}`) { // Visited list
                return Promise.resolve({data: {exists: false}});
            }
            if (url === `lists/102/restaurants/${mockRestaurantId}`) { // To Visit list
                return Promise.resolve({data: {exists: false}});
            }
            return Promise.reject(new Error(`Unhandled GET request: ${url}`)); // Catch unmocked calls
        });
        // Default post/delete successful responses (can be overridden in specific tests)
        API.post.mockResolvedValue({ data: { success: true } });
        API.delete.mockResolvedValue({ data: { success: true } });
    });

    test('should display correct average stars', async () => {
        const testAverage = 3.5;
        render(<RestaurantMeta {...commonProps} average={testAverage} />);

        // Wait for all initial useEffects to settle
        await waitFor(() => {
            expect(screen.getByText(testAverage.toString())).toBeInTheDocument();
            // Assuming StarIcon is rendering correctly with classes based on average
            expect(screen.getByTestId('average-star-1')).toHaveClass('text-green');
            expect(screen.getByTestId('average-star-2')).toHaveClass('text-green');
            expect(screen.getByTestId('average-star-3')).toHaveClass('text-green');
            expect(screen.getByTestId('average-star-4')).toHaveClass('text-gray-600');
            expect(screen.getByTestId('average-star-5')).toHaveClass('text-gray-600');
        });
    });

    test('should display categories correctly', () => {
        render(<RestaurantMeta {...commonProps} />);
        expect(screen.getByText(/Française/i)).toBeInTheDocument();
        expect(screen.getByText(/Accès handicapé/i)).toBeInTheDocument();
        expect(screen.getByText(/Végane/i)).toBeInTheDocument();
        expect(screen.getByText(/Livraison/i)).toBeInTheDocument();
        expect(screen.queryByText(/Végétarien/i)).not.toBeInTheDocument(); // 'no' ne doit pas être affiché
        expect(screen.queryByText(/A emporter/i)).not.toBeInTheDocument(); // 'no' ne doit pas être affiché
    });

    test('should handle liking a restaurant (initially not liked)', async () => {
        // Override mock for this specific test if needed, but beforeEach handles it
        // API.get.mockImplementationOnce((url) => { ... }); // Example if you need different initial state

        render(<RestaurantMeta {...commonProps} />);

        // Wait for the Restaurant3Butons's useEffect to finish checking favorite status
        await waitFor(() => {
            const favoriteIcon = screen.getByTestId('FavoriteIcon');
            expect(favoriteIcon).not.toHaveClass('text-green');
        });

        const favoriteIcon = screen.getByTestId('FavoriteIcon');
        fireEvent.click(favoriteIcon);

        await waitFor(() => {
            expect(API.post).toHaveBeenCalledWith('/favorites', { restaurant_id: mockRestaurantId });
            expect(favoriteIcon).toHaveClass('text-green');
        });
    });

    test('should handle unliking a restaurant (initially liked)', async () => {
        // Override mock for initial state to be liked
        API.get.mockImplementation((url) => {
            if (url === `favorites/${mockRestaurantId}`) {
                return Promise.resolve({ data: { favorite: true } });
            }
            if (url === `ratings/${mockRestaurantId}`) { // Ensure other mocks are consistent
                return Promise.resolve({ data: { userRating: 0 } });
            }
            if (url === `/lists`) {
                return Promise.resolve({
                    data: [
                        { id: 101, name: 'restaurants visités' },
                        { id: 102, name: 'restaurants à visiter' },
                    ],
                });
            }
            if (url === `lists/101/restaurants/${mockRestaurantId}`) { // Visited list
                return Promise.resolve({ data: { exists: false } });
            }
            if (url === `lists/102/restaurants/${mockRestaurantId}`) { // To Visit list
                return Promise.resolve({ data: { exists: false } });
            }
            return Promise.reject(new Error(`Unhandled GET request: ${url}`));
        });


        render(<RestaurantMeta {...commonProps} />);

        await waitFor(() => {
            const favoriteIcon = screen.getByTestId('FavoriteIcon');
            expect(favoriteIcon).toHaveClass('text-green');
        });

        const favoriteIcon = screen.getByTestId('FavoriteIcon');
        fireEvent.click(favoriteIcon);

        await waitFor(() => {
            expect(API.delete).toHaveBeenCalledWith(`favorites/${mockRestaurantId}`);
            expect(favoriteIcon).not.toHaveClass('text-green');
        });
    });
})