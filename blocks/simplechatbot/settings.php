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
 * Settings for the Simple Chatbot block.
 *
 * @package    block_simplechatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($ADMIN->fulltree) {
    // Welcome message setting.
    $settings->add(new admin_setting_configtext(
        'block_simplechatbot/welcomemessage',
        get_string('welcomemessage', 'block_simplechatbot'),
        '',
        get_string('welcomemessage', 'block_simplechatbot'),
        PARAM_TEXT
    ));

    // Fallback message setting.
    $settings->add(new admin_setting_configtext(
        'block_simplechatbot/fallbackmessage',
        get_string('fallbackmessage', 'block_simplechatbot'),
        '',
        get_string('fallbackmessage', 'block_simplechatbot'),
        PARAM_TEXT
    ));

    // Question and answer pairs setting.
    $settings->add(new admin_setting_configtextarea(
        'block_simplechatbot/questionanswerpairs',
        get_string('questionanswerpairs', 'block_simplechatbot'),
        get_string('questionanswerpairs_desc', 'block_simplechatbot'),
        get_string('defaultquestionanswers', 'block_simplechatbot'),
        PARAM_RAW
    ));
}

