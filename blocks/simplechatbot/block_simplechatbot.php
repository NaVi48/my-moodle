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
 * Simple Chatbot block.
 *
 * @package    block_simplechatbot
 * @copyright  2023 Your Name <your.email@example.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

class block_simplechatbot extends block_base {

    /**
     * Initialize the block.
     */
    public function init() {
        $this->title = get_string('pluginname', 'block_simplechatbot');
    }

    /**
     * Customize the block title based on configuration.
     */
    public function specialization() {
        if (isset($this->config->title)) {
            $this->title = $this->config->title;
        }
    }

    /**
     * Returns the content of the block.
     *
     * @return stdClass Contents of block
     */
    public function get_content() {
        global $PAGE;

        if ($this->content !== null) {
            return $this->content;
        }

        $this->content = new stdClass();
        $this->content->text = '';
        $this->content->footer = '';

        // Load the JavaScript module.
        $PAGE->requires->js_call_amd('block_simplechatbot/chatbot', 'init');

        // Create the chatbot interface.
        $this->content->text .= html_writer::start_div('simplechatbot-container');
        
        // Chat messages container.
        $this->content->text .= html_writer::start_div('simplechatbot-messages', array('id' => 'simplechatbot-messages'));
        $this->content->text .= html_writer::end_div();
        
        // Input area.
        $this->content->text .= html_writer::start_div('simplechatbot-input-container');
        $this->content->text .= html_writer::empty_tag('input', array(
            'type' => 'text',
            'id' => 'simplechatbot-input',
            'class' => 'simplechatbot-input',
            'placeholder' => get_string('askaquestion', 'block_simplechatbot')
        ));
        $this->content->text .= html_writer::tag('button', get_string('send', 'block_simplechatbot'), array(
            'id' => 'simplechatbot-send',
            'class' => 'simplechatbot-send-btn'
        ));
        $this->content->text .= html_writer::end_div();
        
        $this->content->text .= html_writer::end_div();

        return $this->content;
    }

    /**
     * Defines where the block can be added.
     *
     * @return array
     */
    public function applicable_formats() {
        return array(
            'all' => true,
            'course' => true,
            'course-category' => true,
            'site' => true,
            'my' => true
        );
    }

    /**
     * Allow multiple instances of the block.
     *
     * @return bool
     */
    public function instance_allow_multiple() {
        return false;
    }

    /**
     * Indicates that this block has its own configuration settings.
     *
     * @return bool
     */
    public function has_config() {
        return true;
    }
}

