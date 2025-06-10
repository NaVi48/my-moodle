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
 * Settings for the chatbot block.
 *
 * @package    block_chatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    // Bot name setting.
    $settings->add(new admin_setting_configtext(
        'block_chatbot/botname',
        get_string('chatbot_botname', 'block_chatbot'),
        get_string('chatbot_botname_desc', 'block_chatbot'),
        'Moodle Assistant',
        PARAM_TEXT
    ));

    // Welcome message setting.
    $settings->add(new admin_setting_configtextarea(
        'block_chatbot/welcomemsg',
        get_string('chatbot_welcomemsg', 'block_chatbot'),
        get_string('chatbot_welcomemsg_desc', 'block_chatbot'),
        get_string('chatbot_welcome', 'block_chatbot'),
        PARAM_TEXT
    ));

    // API key setting (if needed for external service).
    $settings->add(new admin_setting_configpasswordunmask(
        'block_chatbot/apikey',
        get_string('chatbot_apikey', 'block_chatbot'),
        get_string('chatbot_apikey_desc', 'block_chatbot'),
        '',
        PARAM_TEXT
    ));
}

