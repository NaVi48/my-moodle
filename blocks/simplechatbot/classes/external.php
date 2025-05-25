<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * External API for the Simple Chatbot block.
 *
 * @package    block_simplechatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/externallib.php');

/**
 * External API functions for the Simple Chatbot block.
 */
class block_simplechatbot_external extends external_api {

    /**
     * Returns description of get_config parameters.
     *
     * @return external_function_parameters
     */
    public static function get_config_parameters() {
        return new external_function_parameters([]);
    }

    /**
     * Returns description of get_config return values.
     *
     * @return external_single_structure
     */
    public static function get_config_returns() {
        return new external_single_structure([
            'welcomemessage' => new external_value(PARAM_RAW, 'Welcome message'),
            'fallbackmessage' => new external_value(PARAM_RAW, 'Fallback message'),
            'questionanswerpairs' => new external_value(PARAM_RAW, 'Question and answer pairs in JSON format')
        ]);
    }

    /**
     * Get the chatbot configuration.
     *
     * @return array Configuration values
     */
    public static function get_config() {
        // Get the configuration values.
        $welcomemessage = get_config('block_simplechatbot', 'welcomemessage');
        $fallbackmessage = get_config('block_simplechatbot', 'fallbackmessage');
        $questionanswerpairs = get_config('block_simplechatbot', 'questionanswerpairs');

        // Use default values if not set.
        if (empty($welcomemessage)) {
            $welcomemessage = get_string('welcomemessage', 'block_simplechatbot');
        }
        if (empty($fallbackmessage)) {
            $fallbackmessage = get_string('fallbackmessage', 'block_simplechatbot');
        }
        if (empty($questionanswerpairs)) {
            $questionanswerpairs = get_string('defaultquestionanswers', 'block_simplechatbot');
        }

        return [
            'welcomemessage' => $welcomemessage,
            'fallbackmessage' => $fallbackmessage,
            'questionanswerpairs' => $questionanswerpairs
        ];
    }
}

