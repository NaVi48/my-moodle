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
 * External API for block_chatbot.
 *
 * @package    block_chatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir . '/externallib.php');

/**
 * External API functions for block_chatbot.
 *
 * @package    block_chatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class block_chatbot_external extends external_api {

    /**
     * Returns description of process_message parameters.
     *
     * @return external_function_parameters
     */
    public static function process_message_parameters() {
        return new external_function_parameters([
            'message' => new external_value(PARAM_TEXT, 'The message to process'),
        ]);
    }

    /**
     * Process a message and return a response.
     *
     * @param string $message The message to process
     * @return array The response
     */
    public static function process_message($message) {
        global $USER, $DB;

        // Parameter validation.
        $params = self::validate_parameters(self::process_message_parameters(), [
            'message' => $message,
        ]);

        // Context validation.
        $context = context_system::instance();
        self::validate_context($context);

        // Simple response logic - in a real implementation, this would be more sophisticated.
        $response = '';
        $message = strtolower($params['message']);

        if (strpos($message, 'hello') !== false || strpos($message, 'hi') !== false) {
            $response = "Hello! How can I help you today?";
        } else if (strpos($message, 'course') !== false || strpos($message, 'class') !== false) {
            $response = "You can find your courses on the Dashboard or by clicking on 'My courses' in the navigation.";
        } else if (strpos($message, 'assignment') !== false || strpos($message, 'homework') !== false) {
            $response = "To view your assignments, go to your course page and look for the assignments section.";
        } else if (strpos($message, 'grade') !== false || strpos($message, 'score') !== false) {
            $response = "You can check your grades in the 'Grades' section of each course.";
        } else if (strpos($message, 'help') !== false || strpos($message, 'support') !== false) {
            $response = "If you need help, you can contact your instructor or the support team through the messaging system.";
        } else {
            $response = "I'm not sure I understand. Could you please rephrase your question?";
        }

        return [
            'message' => $response,
        ];
    }

    /**
     * Returns description of process_message return value.
     *
     * @return external_single_structure
     */
    public static function process_message_returns() {
        return new external_single_structure([
            'message' => new external_value(PARAM_TEXT, 'The response message'),
        ]);
    }
}

