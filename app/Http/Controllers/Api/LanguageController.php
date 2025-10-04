<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class LanguageController extends Controller
{
    /**
     * Get translations for a specific language
     */
    public function getTranslations(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string|in:en,fa,ps'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid language parameter',
                'errors' => $validator->errors()
            ], 400);
        }

        $language = $request->input('language');
        $translations = $this->loadTranslations($language);

        return response()->json([
            'success' => true,
            'language' => $language,
            'translations' => $translations
        ]);
    }

    /**
     * Get all available languages
     */
    public function getLanguages(): JsonResponse
    {
        $languages = [
            [
                'code' => 'en',
                'name' => 'English',
                'direction' => 'ltr',
                'active' => true
            ],
            [
                'code' => 'fa',
                'name' => 'دری',
                'direction' => 'rtl',
                'active' => true
            ],
            [
                'code' => 'ps',
                'name' => 'پښتو',
                'direction' => 'rtl',
                'active' => true
            ]
        ];

        return response()->json([
            'success' => true,
            'languages' => $languages
        ]);
    }

    /**
     * Update translations for a specific language
     */
    public function updateTranslations(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string|in:en,fa,ps',
            'translations' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid request data',
                'errors' => $validator->errors()
            ], 400);
        }

        $language = $request->input('language');
        $translations = $request->input('translations');

        try {
            $this->saveTranslations($language, $translations);

            return response()->json([
                'success' => true,
                'message' => 'Translations updated successfully',
                'language' => $language
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update translations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add a new translation key
     */
    public function addTranslation(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string|in:en,fa,ps',
            'key' => 'required|string',
            'value' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid request data',
                'errors' => $validator->errors()
            ], 400);
        }

        $language = $request->input('language');
        $key = $request->input('key');
        $value = $request->input('value');

        try {
            $translations = $this->loadTranslations($language);
            $translations[$key] = $value;
            $this->saveTranslations($language, $translations);

            return response()->json([
                'success' => true,
                'message' => 'Translation added successfully',
                'language' => $language,
                'key' => $key,
                'value' => $value
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add translation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Delete a translation key
     */
    public function deleteTranslation(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'language' => 'required|string|in:en,fa,ps',
            'key' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid request data',
                'errors' => $validator->errors()
            ], 400);
        }

        $language = $request->input('language');
        $key = $request->input('key');

        try {
            $translations = $this->loadTranslations($language);
            
            if (!isset($translations[$key])) {
                return response()->json([
                    'success' => false,
                    'message' => 'Translation key not found'
                ], 404);
            }

            unset($translations[$key]);
            $this->saveTranslations($language, $translations);

            return response()->json([
                'success' => true,
                'message' => 'Translation deleted successfully',
                'language' => $language,
                'key' => $key
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete translation',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all translation keys across all languages
     */
    public function getAllTranslations(): JsonResponse
    {
        $languages = ['en', 'fa', 'ps'];
        $allTranslations = [];

        foreach ($languages as $language) {
            $allTranslations[$language] = $this->loadTranslations($language);
        }

        return response()->json([
            'success' => true,
            'translations' => $allTranslations
        ]);
    }

    /**
     * Load translations from JSON file
     */
    private function loadTranslations(string $language): array
    {
        $filePath = lang_path("{$language}.json");
        
        if (!File::exists($filePath)) {
            return [];
        }

        $content = File::get($filePath);
        $translations = json_decode($content, true);
        
        return is_array($translations) ? $translations : [];
    }

    /**
     * Save translations to JSON file
     */
    private function saveTranslations(string $language, array $translations): void
    {
        $filePath = lang_path("{$language}.json");
        
        // Ensure the lang directory exists
        if (!File::exists(lang_path())) {
            File::makeDirectory(lang_path(), 0755, true);
        }

        // Sort translations by key for better organization
        ksort($translations);
        
        $jsonContent = json_encode($translations, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        File::put($filePath, $jsonContent);
    }
}
